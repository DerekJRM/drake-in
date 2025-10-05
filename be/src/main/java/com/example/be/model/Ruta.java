package com.example.be.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.apache.commons.beanutils.PropertyUtils;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RUTAS")
public class Ruta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "ORIGEN_ID", nullable = false)
    private Long origenId;

    @Column(name = "FECHA", nullable = false)
    private LocalDate fecha;

    @Column(name = "HORARIO_ID", nullable = false)
    private Long horarioId;

    @Column(name = "OPERADOR_ID", nullable = false)
    private Long operadorId;

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
    public void applyUpdateableFields (Ruta objActualiza) throws Exception {
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
