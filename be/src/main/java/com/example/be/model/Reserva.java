package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.apache.commons.beanutils.PropertyUtils;

import java.time.LocalDate;
import java.util.UUID; // Para email

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

    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "CORREO", length = 100, nullable = false)
    private String correo;

    @Column(name = "ORIGEN_ID", nullable = true)
    private Long origenId;

    //@JsonProperty("destinoId") // Lo comente porque daba problemas al intentar parsear el JSON
    @Column(name = "DESTINO_ID", nullable = true)
    private Long destinoId;

    @Column(name = "FECHA", nullable = true)
    private LocalDate fecha;

    @Column(name = "HORARIO_ID", nullable = true)
    private Long horarioId;

    @Column(name = "HOTEL_ID", nullable = true) // nullable true para hacer que el formularios de reservas quede bien.
    private Long hotelId;

    //@JsonProperty("newItem") // Lo comente porque daba problemas al intentar parsear el JSON
    @Transient
    private boolean newItem;

    @Column(name = "CANCELLATION_TOKEN", length = 36, unique = true)
    private String cancellationToken;

    @Transient
    private List<String> updateableFields;

    public boolean hasUpdatableFields() {
        return !this.updateableFields.isEmpty();
    }

    // Jackson usa este getter para booleanos
//    public boolean isNewItem() {
//        return newItem;
//    }

//    public void setNewItem(boolean newItem) {
//        this.newItem = newItem;
//    }

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
