package cn.edu.whut.sept.zuul.controller;

import cn.edu.whut.sept.zuul.domain.Game;
import cn.edu.whut.sept.zuul.service.Result;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/games")
public class DataController {
    @GetMapping("/data")
    public Result gameData() {
        Game game = new Game("魔法金币",100,"银子",50,"铜板",25,500,50);
        return new Result(21,game,"");
    }

}
