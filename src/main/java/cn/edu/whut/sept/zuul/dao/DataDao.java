package cn.edu.whut.sept.zuul.dao;

import cn.edu.whut.sept.zuul.domain.Save;
import com.whut.domain.Save;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface DataDao {
    //保存游戏数据到数据库
    @Insert("insert into gamedata values(#{username},#{exCurrentRoom})")
    int save(Save save);
    @Select("select * from gamedata where username=#{username}")
    Save getSaveDataByUsername(String username);
    @Update("update gamedata set currentRoom=#{exCurrentRoom} where username=#{username}")
    int update(Save save);
}
