package cl.sys.discoveryservice.apigateawaysys2.config;

import org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class GatewayConfig {

    @Bean
    public RouterFunction<ServerResponse> apiRegistroRoute() {
        return GatewayRouterFunctions.route("api-registro")
                .route(
                        RequestPredicates.path("/api/registro").or(RequestPredicates.path("/api/registro/**")),
                        HandlerFunctions.http()
                )
                .filter(LoadBalancerFilterFunctions.lb("bff-sanys"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> apiLoginRoute() {
        return GatewayRouterFunctions.route("api-login")
                .route(
                        RequestPredicates.path("/api/login").or(RequestPredicates.path("/api/login/**")),
                        HandlerFunctions.http()
                )
                .filter(LoadBalancerFilterFunctions.lb("bff-sanys"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> reportesRoute() {
        return GatewayRouterFunctions.route("reportes")
                .route(
                        RequestPredicates.path("/reportes").or(RequestPredicates.path("/reportes/**")),
                        HandlerFunctions.http()
                )
                .filter(LoadBalancerFilterFunctions.lb("bff-sanys"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> notificationsRoute() {
        return GatewayRouterFunctions.route("notifications")
                .route(
                        RequestPredicates.path("/api/notifications").or(RequestPredicates.path("/api/notifications/**")),
                        HandlerFunctions.http()
                )
                .filter(LoadBalancerFilterFunctions.lb("bff-sanys"))
                .build();
    }
}
