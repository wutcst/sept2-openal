package cn.edu.whut.sept.zuul.Controller;

import cn.edu.whut.sept.zuul.service.Game;
import cn.edu.whut.sept.zuul.service.Print;
import cn.edu.whut.sept.zuul.service.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/print")
public class PrintController {
    @GetMapping
    public Result print(String s) {
        Print.input = s;
        if (!Print.startGame) {
            Print.startGame = true;
            new Game().play();
        }
        Result result = new Result(100,Print.s,"获取输入命令成功");
        return result;
    }
}
