package com.example.be.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.InvocationTargetException;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USUARIOS")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "USUARIO", length = 50, nullable = false, unique = true)
    private String usuario;

    @Column(name = "CONTRASENA", length = 100, nullable = false)
    private String contrasena;

    @Column(name = "ROL", length = 20, nullable = false)
    private String rol;

    @Transient
    private boolean newItem;

    @Transient
    private List<String> updateableFields;

    public boolean hasUpdatableFields() {
        return !this.updateableFields.isEmpty();
    }

    /**
     * Este metodo recibe el objeto del Frontend que contiene los campos a actualizar
     * y los mapea en el objeto original para que sean actualizables, sin modificar ningun elemento no deseado.
     * @param objActualiza
     */
    public void applyUpdateableFields (Usuario objActualiza) throws Exception {
        if (objActualiza.hasUpdatableFields()) {
            for (String atributo : objActualiza.getUpdateableFields()){
                try {
                    PropertyUtils.setProperty(this, atributo, PropertyUtils.getProperty(objActualiza, atributo));
                } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException ex) {
                    throw new Exception(ex);
                }
            }
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // roles no usados directamente
    }

    @Override
    public String getPassword() {
        return contrasena;
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}
