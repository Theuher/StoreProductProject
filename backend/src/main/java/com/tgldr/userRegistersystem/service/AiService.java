package com.tgldr.userRegistersystem.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tgldr.userRegistersystem.dto.AiModelDTO;
import com.tgldr.userRegistersystem.entity.AiModel;
import com.tgldr.userRegistersystem.repository.AiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AiService {
    @Autowired
    public AiRepository aiRepository;
    public AiModelDTO saveAiModel(AiModelDTO aiModelDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null && authentication.isAuthenticated())
                ? authentication.getName()
                : "anonymous";

        aiModelDTO.setCreatedUser(username);
        aiModelDTO.setCreatedDate(LocalDateTime.now());

        try {
            String responseBase64 = sendImageToApi(aiModelDTO.getImage());
            if (responseBase64 == null || responseBase64.isEmpty()) {
                aiModelDTO.setGeneratedImage("data:image/jpeg;base64," + aiModelDTO.getImage());
            } else {
                aiModelDTO.setGeneratedImage("data:image/jpeg;base64," + responseBase64);
            }

        } catch (IOException e) {
            e.printStackTrace();
            try {
                File fallbackFile = new File("C:\\Users\\Dell\\OneDrive\\Desktop\\LOGINREGISTER\\backend\\src\\main\\java\\com\\tgldr\\userRegistersystem\\service\\image\\braintumor.jpg");
                String fallbackBase64 = encodeImageToBase64(fallbackFile);
                aiModelDTO.setGeneratedImage("data:image/jpeg;base64," + fallbackBase64);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }

        AiModel savedEntity = aiRepository.save(aiModelDTO.toEntity());
        return AiModelDTO.fromEntity(savedEntity);
    }

    private String encodeImageToBase64(File file) throws IOException {
        FileInputStream imageInFile = new FileInputStream(file);
        byte[] imageData = new byte[(int) file.length()];
        imageInFile.read(imageData);
        imageInFile.close();
        return Base64.getEncoder().encodeToString(imageData);
    }

    public List<AiModelDTO> getModelsByName(String name) {
        List<AiModel> models = aiRepository.getAiModelsByClientName(name);
        return models.stream().map(AiModelDTO::fromEntity).collect(Collectors.toList());
    }
    private String sendImageToApi(String base64Image) throws IOException {
        if (base64Image.startsWith("data:image")) {
            base64Image = base64Image.split(",")[1];
        }
        base64Image = base64Image.trim();

        System.out.println("Sending base64: " + base64Image.substring(0, Math.min(100, base64Image.length())) + "...");

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("image", base64Image);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        String flaskUrl = "http://172.16.151.68:4000/predict";

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                String annotatedBase64 = (String) response.getBody().get("annotated_image");
                System.out.println("Received annotated image (Base64)");
                return annotatedBase64;
            } else {
                System.out.println("Request failed: " + response.getStatusCode());
                return "Error: " + response.getStatusCode();
            }
        } catch (HttpServerErrorException e) {
            System.out.println("Server error: " + e.getResponseBodyAsString());
            return "Error: " + e.getResponseBodyAsString();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }
}
