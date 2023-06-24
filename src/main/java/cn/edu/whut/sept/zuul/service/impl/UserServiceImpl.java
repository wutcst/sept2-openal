package cn.edu.whut.sept.zuul.service.impl;

import cn.edu.whut.sept.zuul.dao.UserDao;
import cn.edu.whut.sept.zuul.domain.User;
import cn.edu.whut.sept.zuul.service.Result;
import cn.edu.whut.sept.zuul.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public Result loginOrRegis(User user) {
        //查询数据库中是否存在此用户名
        User user1 = userDao.findByUsername(user.getUsername());
        if (user1 == null) {
            //不存在此用户，注册账号
            if (userDao.register(user) > 0)
                return new Result(10,"注册成功");
            else
                return new Result(11,"注册失败，请重试");
        } else {
            //检查密码是否正确
            User user2 = userDao.findByUsernameAndPwd(user);
            if (user2 == null) {
                //密码不正确
                return new Result(11,"密码错误");
            } else
                //密码正确，登录
                return new Result(10,"登录成功");
        }
    }
}
