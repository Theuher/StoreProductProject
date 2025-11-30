package repository;

import com.tgldr.userRegistersystem.entity.AiModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AiRepository extends MongoRepository<AiModel , String> {
    List<AiModel> getAiModelsByClientName(String clientName);
}
