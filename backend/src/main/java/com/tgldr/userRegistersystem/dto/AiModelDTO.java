package com.tgldr.userRegistersystem.dto;

import com.tgldr.userRegistersystem.entity.AiModel;
import com.tgldr.userRegistersystem.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class AiModelDTO {
    private String id;
    private String name;
    private String image;
    private String generatedImage;
    private String clientName;
    private String createdUser;
    private LocalDateTime createdDate;
    public static AiModelDTO fromEntity(AiModel entity) {
        AiModelDTO dto = new AiModelDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setImage(entity.getImage());
        dto.setGeneratedImage(entity.getGeneratedImage());
        dto.setClientName(entity.getClientName());
        dto.setCreatedUser(entity.getCreatedUser());
        dto.setCreatedDate(entity.getCreatedDate());
        return dto;
    }
    public AiModel toEntity() {
        AiModel entity = new AiModel();
        entity.setId(this.id);
        entity.setName(this.name);
        entity.setImage(this.image);
        entity.setGeneratedImage(this.generatedImage);
        entity.setClientName(this.clientName);
        entity.setCreatedDate(this.createdDate);
        entity.setCreatedUser(this.createdUser);
        return entity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getGeneratedImage() {
        return generatedImage;
    }

    public void setGeneratedImage(String generatedImage) {
        this.generatedImage = generatedImage;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}


