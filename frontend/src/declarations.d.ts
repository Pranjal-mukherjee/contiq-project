declare module "*.png";
declare module "*.gif";
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "gapi-cjs";
declare module "*.pdf" {
  const content: string;
  export default content;
}
declare module "@pdftron/pdfjs-express";
