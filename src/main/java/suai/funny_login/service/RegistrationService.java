package suai.funny_login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import suai.funny_login.entity.UserEntity;
import suai.funny_login.exception.AlreadyExistUserException;
import suai.funny_login.model.UserModel;
import suai.funny_login.repositoty.RegistrationRepository;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public boolean saveUser(UserEntity user) throws AlreadyExistUserException {
        UserEntity existUser = registrationRepository
                .findByUsername(user.getUsername());
        if (existUser == null) {
            registrationRepository.save(user);
            return true;
        }
        throw new AlreadyExistUserException("User with this username " +
                "already exist");
    }

    public List<UserModel> getUsers(){
        return registrationRepository
                .findAll().stream().map(
                        UserEntity::toModel
                ).collect(Collectors.toList());
    }

}
