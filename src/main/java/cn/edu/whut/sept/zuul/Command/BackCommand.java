package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

import java.util.regex.Pattern;

public class BackCommand extends Command {


    @Override
    public boolean execute(Game game) {

        if(game.step >= 1){
            game.setCurrentRoom(game.previousRoom.get(game.step-1));
            game.step--;
            if(game.step == 0){
                Print.print("You're back to square one!");
            }
            else{
                Print.print("You are teleported to" + " " + game.getCurrentRoom().getShortDescription());
                Print.print(game.getCurrentRoom().getLongDescription());
            }
            Print.print(game.getCurrentRoom().getLongDescription());
        }

        return false;

    }
}
