package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.beanutils.PropertyUtils;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "HORARIOS")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Temporal(TemporalType.TIME)
    @Column(name="HORA", nullable=false)
    @JsonFormat(pattern = "HH:mm")
    private LocalTime hora;

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
    public void applyUpdateableFields (Horario objActualiza) throws Exception {
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
