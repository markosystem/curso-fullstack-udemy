package org.mbs.udemy;

import org.mbs.udemy.model.entity.Cliente;
import org.mbs.udemy.model.entity.ServicoPrestado;
import org.mbs.udemy.model.repository.ClienteRepository;
import org.mbs.udemy.model.repository.ServicoPrestadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class ClientesApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClientesApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(@Autowired ClienteRepository clienteRepository, @Autowired ServicoPrestadoRepository servicoPrestadoRepository) {
        return args -> {
            Cliente cliente = Cliente.builder().nome("Marcos").cpf("02614895180").build();
            Cliente clienteSave1 = clienteRepository.save(cliente);

            Cliente cliente2 = Cliente.builder().nome("Santos").cpf("02614895180").build();
            Cliente clienteSave2 = clienteRepository.save(cliente2);

            ServicoPrestado servicoPrestado1 = ServicoPrestado.builder().descricao("Concerto do ar").data(LocalDate.parse("2021-10-10")).valor(new BigDecimal("900.00")).cliente(clienteSave1).build();
            servicoPrestadoRepository.save(servicoPrestado1);

            ServicoPrestado servicoPrestado2 = ServicoPrestado.builder().descricao("Concerto do Computador").data(LocalDate.now()).valor(new BigDecimal("1800.00")).cliente(clienteSave2).build();
            servicoPrestadoRepository.save(servicoPrestado2);
        };
    }
}
