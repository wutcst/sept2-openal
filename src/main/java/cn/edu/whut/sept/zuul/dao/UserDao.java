package cn.edu.whut.sept.zuul.dao;

import cn.edu.whut.sept.zuul.domain.User;
import com.whut.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserDao {
    @Select("select * from user where username=#{username} and password=#{password}")
    User findByUsernameAndPwd(User user);

    @Select("select * from user where username=#{username}")
    User findByUsername(String username);

    @Insert("insert into user values(null,#{username},#{password})")
    int register(User user);
}
