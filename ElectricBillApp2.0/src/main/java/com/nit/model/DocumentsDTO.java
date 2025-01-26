package com.nit.model;

import java.util.Base64;

public class DocumentsDTO {
    private String name;
    private String type;
    private String content; // Base64 String

    public DocumentsDTO(String name, String type, byte[] content) {
        this.name = name;
        this.type = type;
        this.content = (content != null) ? Base64.getEncoder().encodeToString(content) : null;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}

