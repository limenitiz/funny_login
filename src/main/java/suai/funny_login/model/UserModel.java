package suai.funny_login.model;

import com.sun.istack.NotNull;
import lombok.*;

@Builder
public class UserModel {
    @Getter @Setter @NotNull private String username;
}
