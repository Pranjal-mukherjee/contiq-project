package com.pocketpay.apigateway.filter;

import com.pocketpay.apigateway.exception.SignatureException;
import com.pocketpay.apigateway.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;


@Component
@Slf4j
public class AuthenticationFilter
        extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (
                (exchange, chain) -> {
                    String requestPath = exchange.getRequest().getURI().getPath();

                    if (shouldSkipAuthentication(requestPath)) {
                        return chain.filter(exchange);
                    }
                    if (validator.isSecured.test(exchange.getRequest())) {
                        if (
                                !exchange
                                        .getRequest()
                                        .getHeaders()
                                        .containsKey(HttpHeaders.AUTHORIZATION)
                        ) {
                            throw new SignatureException(
                                    "Authorization header is not present"
                            );
                        }
                        String authHeader = exchange
                                .getRequest()
                                .getHeaders()
                                .get(HttpHeaders.AUTHORIZATION)
                                .get(0);
                        if (authHeader != null && authHeader.startsWith("Bearer ")) {
                            authHeader = authHeader.substring(7);
                        }

                        try {
                            jwtUtil.validateToken(authHeader);
                        } catch (SignatureException ex) {
                            log.error("Invalid access or signature...!");
                            throw new SignatureException("Unauthorized access or invalid signature");
                        } catch (Exception ex) {
                            log.error("Unexpected error during token validation: {}", ex.getMessage(), ex);
                            throw new SignatureException("Unexpected error during token validation");
                        }
                    }
                    return chain.filter(exchange);
                }
        );
    }

    private boolean shouldSkipAuthentication(String requestPath) {
        String excludedPattern1 = "/api/v1/users/signup";
        String excludedPattern2 = "/api/v1/users/login";
        String excludedPattern3 = "/api/v1/users";
        String excludedPattern4 = "/api/v1/users/reset-password";
        System.out.println("Requset path: "+requestPath);
        return requestPath.endsWith(excludedPattern1) ||
                requestPath.endsWith(excludedPattern2) ||
                requestPath.endsWith(excludedPattern3) || requestPath.endsWith(excludedPattern4);
    }

    public static class Config {
    }
}