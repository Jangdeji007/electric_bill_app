package com.nit.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex) {
    	 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                 .body(Map.of(
                     "status", "failed",
                     "message", ex.getMessage()
                 ));
    }
    
    @ExceptionHandler(AllReadyCreated.class)
    public ResponseEntity<Object> handleAllreadyCreated(AllReadyCreated ex) {
    	 return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
                 .body(Map.of(
                     "status", "failed",
                     "message", ex.getMessage()
                 ));
    }
}
