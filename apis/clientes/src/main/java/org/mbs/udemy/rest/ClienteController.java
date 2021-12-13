package org.mbs.udemy.rest;

import org.mbs.udemy.model.entity.Cliente;
import org.mbs.udemy.model.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente save(@RequestBody @Valid Cliente cliente) {
        return this.clienteRepository.save(cliente);
    }

    @GetMapping
    public List<Cliente> getAll() {
        return this.clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSingleById(@PathVariable Integer id) {
        Optional<?> cliente = this.clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "O cliente não foi encontrado!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        ResponseEntity<?> cliente = this.getSingleById(id);
        if (cliente.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return cliente;
        }
        this.clienteRepository.delete((Cliente) cliente.getBody());
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Cliente clienteAtualizar) {
        ResponseEntity<?> clienteOp = this.getSingleById(clienteAtualizar.getId());
        if (clienteOp.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return clienteOp;
        }
        Cliente clienteUp = (Cliente) clienteOp.getBody();
        return ResponseEntity.ok(this.clienteRepository.save(clienteAtualizar));
    }


}
