package com.nit.service;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.nit.exception.UserNotFoundException;
import com.nit.model.Address;
import com.nit.model.ApplicantRegister;
import com.nit.model.Documents;
import com.nit.model.DocumentsDTO;
import com.nit.repository.ApplicantRepository;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

@Service
public class CreatePdf {

	@Autowired
	ApplicantRepository appRepo;
	

    private final TemplateEngine templateEngine;

    public CreatePdf(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

	public byte[] generatePdf(String email)
	{
		ApplicantRegister register = appRepo.findByEmail(email).orElseThrow(()-> new UserNotFoundException("user not found"));
		Set<DocumentsDTO> documents = new DocumentService().convertToBase64(register.getDocuments());
		Address address = register.getAddress();
		Map<String, Object> data= new HashMap<>();
		data.put("appliDetails", register);
		data.put("address", address);
		data.put("documents", documents);
		
		Context context = new Context();
	        context.setVariables(data);

	        // Process Thymeleaf template into HTML
	        String htmlContent = templateEngine.process("sample", context);

	        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
	            PdfRendererBuilder builder = new PdfRendererBuilder();
	            builder.useFastMode();
	            builder.toStream(outputStream);
	            builder.withHtmlContent(htmlContent, "file:///");
	            builder.run();
	            return outputStream.toByteArray();
	        } catch (Exception e) {
	            throw new RuntimeException("Error while generating PDF", e);
	        }
	}
	  
}

@Service
 class DocumentService {
    public Set<DocumentsDTO> convertToBase64(Set<Documents> documents) {
        Set<DocumentsDTO> base64Documents = new HashSet<>();

        for (Documents doc : documents) {
            base64Documents.add(new DocumentsDTO(doc.getName(), doc.getType(), doc.getContent()));
        }

        return base64Documents;
    }
}
