import IconComponent from '@components/atoms/Icon'
import CustomTypography from '@components/atoms/Typography'
import { Box, styled } from '@mui/material';
import theme from '@src/theme';
import { DISCOVERY_DOCS, DRAG_MEDIA_CONTENT, SCOPE } from '@src/utils/constants';
import GooleDrive from '@assets/images/GoogleDrive.svg';
import DropBox from '@assets/images/DropBox.svg';
import TeraBox from '@assets/images/TeraBox.svg';
import Cloud from '@assets/images/Cloud.svg';
import React from 'react';
import { gapi } from 'gapi-script';
interface CloudStorageProps {
    onDataReceived: (folderData: any[], files: any[]) => void;
  }
const RootBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.spacing(90.5),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grays.gray400,
    padding: theme.spacing(35),
    boxSizing: 'border-box',
    border: `1px dashed ${theme.palette.grays.gray200}`,
    maxWidth: theme.spacing(159),
    borderImage: `repeating-linear-gradient(
      45deg,
      grey,
      grey 11px,
      transparent 11px,
      transparent 20px
    )1`,
    marginLeft:"30px",
    gap:"30px"
  });
  
  const TextComponent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(54),
    height: theme.spacing(12.75),
    justifyContent: 'center',
    alignItems: 'center'
  });
  
  const ImageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: theme.spacing(74),
    height: theme.spacing(12.5),
    justifyContent: 'space-between',
    gap: theme.spacing(8),
    cursor:'pointer'
  });
  
const CloudStorage = ({ onDataReceived }:CloudStorageProps) => {
    const initClient = () => {
        gapi.client
          .init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPE,
          })
          .then(
            (data: any) => {
              const authInstance = gapi.auth2.getAuthInstance();
              if (authInstance) {
                authInstance.isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(authInstance.isSignedIn.get());
              } else {
                console.error('Auth instance not available.');
              }
            },
            (error: any) => console.error('Initialization error:', error)
          );
      };
      
    
      const updateSigninStatus = (isSignedIn: boolean) => {
        if (isSignedIn) {
          listFiles();
        } else {
          gapi.auth2.getAuthInstance()?.signIn();
        }
      };
    
      const listFiles = (searchTerm = null) => {
        gapi.client.drive.files
          .list({
            fields: 'files'
          })
          .then((response: any) => {
            const res = JSON.parse(response.body);
            const folderData = res.files.filter(
              (file: any) => file?.mimeType.split('.').pop()?.toLowerCase() === 'folder'
            );
            const files = res.files.filter((file: any) =>
              file?.mimeType.split('.').pop()?.toLowerCase().includes('pdf')
            );
           
            onDataReceived(folderData, files);
          })
          .catch((error: any) => console.log(error));
      };
    
      const handleClientLoad = () => {
        gapi.load('client:auth2', initClient);
      };
  return (
    <Box>
    <RootBox>
      <TextComponent>
        <CustomTypography
          children={DRAG_MEDIA_CONTENT[0]}
          variant="subtitle2"
          sx={{ color: theme.palette.text.white }}
        />
        <CustomTypography
          children={DRAG_MEDIA_CONTENT[1]}
          variant="subtitle2"
          sx={{ color: theme.palette.text.white }}
        />
      </TextComponent>
      <ImageContainer>
        <IconComponent src={GooleDrive} height="50px" width="50px" onclick={handleClientLoad}/>
        <IconComponent src={DropBox} height="50px" width="50px" />
        <IconComponent src={Cloud} height="50px" width="50px" />
        <IconComponent src={TeraBox} height="50px" width="50px" />
      </ImageContainer>
    </RootBox>
  </Box>
  )
}

export default CloudStorage
