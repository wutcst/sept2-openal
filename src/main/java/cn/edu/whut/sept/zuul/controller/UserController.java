package cn.edu.whut.sept.zuul.Controller;

import com.whut.domain.User;
import com.whut.service.Code;
import com.whut.service.Result;
import com.whut.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;
    @GetMapping
    public Result getAllRooms() {
        List<Integer> rooms = new ArrayList<>();
        rooms.add(10);
        rooms.add(5);
        rooms.add(15);
        rooms.add(25);
        rooms.add(10);
        return new Result(Code.ROOM_OK,rooms,"ok");
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        return service.loginOrRegis(user);
    }
}
