package suai.funny_login.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import suai.funny_login.entity.UserEntity;
import suai.funny_login.exception.AlreadyExistUserException;
import suai.funny_login.service.RegistrationService;


@RestController
@RequestMapping("/users")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;
    private static final Gson gson = new Gson();

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserEntity user){
        try {
            registrationService.saveUser(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .build();

        } catch (AlreadyExistUserException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(gson.toJson(e.getMessage()));

        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @GetMapping("get/all")
    public ResponseEntity<?> getUsersList() {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(gson.toJson(
                            registrationService.getUsers()
                    ));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
