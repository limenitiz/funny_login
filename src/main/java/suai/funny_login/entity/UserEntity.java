package suai.funny_login.entity;

import com.sun.istack.NotNull;
import lombok.*;
import suai.funny_login.model.UserModel;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "service_user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter          private Long id;
    @Getter @Setter @NotNull private String username;
    @Getter @Setter @NotNull private String password;
    @Getter @Setter @NotNull private String phone;

    public UserModel toModel() {
        return UserModel.builder()
                .username(this.username)
                .build();
    }
}
