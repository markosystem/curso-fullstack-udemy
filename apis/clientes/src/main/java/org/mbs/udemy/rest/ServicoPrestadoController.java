package org.mbs.udemy.rest;

import org.mbs.udemy.model.entity.Cliente;
import org.mbs.udemy.model.entity.ServicoPrestado;
import org.mbs.udemy.model.repository.ClienteRepository;
import org.mbs.udemy.model.repository.ServicoPrestadoRepository;
import org.mbs.udemy.rest.dto.ServicoPrestadoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos-prestados")
public class ServicoPrestadoController {

    @Autowired
    private ServicoPrestadoRepository servicoPrestadoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado save(@RequestBody @Valid ServicoPrestadoDTO dto) {
        ServicoPrestado servicoPrestado = this.convert(dto);
        Cliente cliente = clienteRepository.findById(dto.getId_cliente()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não foi encontrado!"));
        servicoPrestado.setCliente(cliente);
        return this.servicoPrestadoRepository.save(servicoPrestado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSingleById(@PathVariable Integer id) {
        Optional<?> servico = this.servicoPrestadoRepository.findById(id);
        return servico.map(ResponseEntity::ok).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "O serviço não foi encontrado!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        ResponseEntity<?> servico = this.getSingleById(id);
        if (servico.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return servico;
        }
        this.servicoPrestadoRepository.delete((ServicoPrestado) Objects.requireNonNull(servico.getBody()));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") Integer idServico, @RequestBody ServicoPrestadoDTO dto) {
        ResponseEntity<?> servicoOp = this.getSingleById(idServico);
        if (servicoOp.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return servicoOp;
        }
        ServicoPrestado servicoPrestado = this.convert(dto);
        servicoPrestado.setId(idServico);
        Cliente cliente = clienteRepository.findById(dto.getId_cliente()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não foi encontrado!"));
        servicoPrestado.setCliente(cliente);
        return ResponseEntity.ok(this.servicoPrestadoRepository.save(servicoPrestado));
    }

    @RequestMapping
    public ResponseEntity<?> search(@RequestParam(value = "nome", required = false, defaultValue = "") String nome,
                                    @RequestParam(value = "mes", required = false) Integer mes) {
        List<ServicoPrestado> list = this.servicoPrestadoRepository.findServicoPrestadoPorNomeAndMes("%" + nome + "%", mes);
        return ResponseEntity.ok(list);
    }

    private ServicoPrestado convert(ServicoPrestadoDTO dto) {
        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setValor(new BigDecimal(dto.getValor()));
        servicoPrestado.setData(LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        return servicoPrestado;
    }

}
