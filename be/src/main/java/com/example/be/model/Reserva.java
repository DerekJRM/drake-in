package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "RESERVAS")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @JsonProperty("rutaId")
    @Column(name = "RUTA_ID", nullable = false)
    private Long rutaId;

    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "CORREO", length = 100, nullable = false)
    private String correo;

    @JsonProperty("destinoId")
    @Column(name = "DESTINO_ID", nullable = false)
    private Long destinoId;

    @JsonProperty("newItem")
    @Transient
    private boolean newItem;

    @Transient
    private List<String> updateableFields;

    public boolean hasUpdatableFields() {
        return !this.updateableFields.isEmpty();
    }

    // Jackson usa este getter para booleanos
    public boolean isNewItem() {
        return newItem;
    }

    public void setNewItem(boolean newItem) {
        this.newItem = newItem;
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
