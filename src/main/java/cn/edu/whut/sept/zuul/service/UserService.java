package cn.edu.whut.sept.zuul.service;

import cn.edu.whut.sept.zuul.domain.User;

public interface UserService {
    /**
     * 登录或者注册账号
     * @param user 用户输入的账号信息
     * @return 登录或注册是否成功
     */
    public Result loginOrRegis(User user);
}
