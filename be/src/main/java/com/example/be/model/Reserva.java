package com.example.be.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.apache.commons.beanutils.PropertyUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RESERVAS")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "RUTA_ID", nullable = false)
    private Long rutaId;

    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "CORREO", length = 100, nullable = false)
    private String correo;

    @Column(name = "DESTINO_ID", nullable = false)
    private Long destinoId;

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
    public void applyUpdateableFields (Reserva objActualiza) throws Exception {
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
}
