package controller;

import com.tgldr.userRegistersystem.dto.AiModelDTO;
import com.tgldr.userRegistersystem.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AiController {
    @Autowired
    public AiService aiService;


    @PostMapping("/aimodel/save")
    public ResponseEntity<AiModelDTO> saveAiModel(@RequestBody AiModelDTO aiModelDTO){
        return ResponseEntity.ok(aiService.saveAiModel(aiModelDTO));
    }

    @GetMapping("/aimodel/get/all/ByName")
    public ResponseEntity<List<AiModelDTO>> getModelsByName(@RequestParam("name") String name){
        return ResponseEntity.ok(aiService.getModelsByName(name));
    }

}
