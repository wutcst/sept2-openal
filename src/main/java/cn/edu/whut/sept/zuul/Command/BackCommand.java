package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;
import cn.edu.whut.sept.zuul.service.Print;

public class BackCommand extends Command {


    @Override
    public boolean execute(Game game) {

        if(game.step >= 1){
            game.setCurrentRoom(game.previousRoom.get(game.step-1));
            game.step--;
            if(game.step == 0){
                Print.s += "You're back to square one!";
//                Print.print();
            }
            else{
                Print.s += "You are teleported to" + " " + game.getCurrentRoom().getShortDescription();
                Print.print(game.getCurrentRoom().getLongDescription());
            }
            Print.print(game.getCurrentRoom().getLongDescription());
        }

        return false;

    }
}
