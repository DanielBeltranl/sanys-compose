package cl.sys.bff.bfffsanys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import cl.sys.bff.bfffsanys.config.GlobalFeignConfig;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(defaultConfiguration = GlobalFeignConfig.class)
public class BfffSanysApplication {

    public static void main(String[] args) {

        SpringApplication.run(BfffSanysApplication.class, args);
    }

}
