package com.framework.blog.dto;

import com.framework.blog.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String password;

    public User toEntity(){
        return User.builder()
                .id(this.getId())
                .password(this.getPassword())
                .name(this.getName())
                .password(this.getPassword())
                .build();
    }

}
