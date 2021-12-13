package org.mbs.udemy.model.repository;

import org.mbs.udemy.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    //@Query("select s from ServicoPrestado s join s.cliente c where (upper(c.nome) like upper(:nome) or c.nome = '') or MONTH(s.data) = :mes")
    //List<ServicoPrestado> findServicoPrestadoPorNomeAndMes(@Param("nome") String nome, @Param("mes") Integer mes);

    Optional<Usuario> findByUsername(String username);
}
