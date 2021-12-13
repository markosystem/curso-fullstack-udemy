package org.mbs.udemy.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServicoPrestadoDTO {
    @NotEmpty(message = "{campo.descricao.invalido}")
    private String descricao;

    @NotEmpty(message = "{campo.valor.invalido}")
    private String valor;

    @NotEmpty(message = "{campo.data.invalido}")
    private String data;

    @NotNull(message = "{campo.cliente.invalido}")
    private Integer id_cliente;
}
