package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;
import cn.edu.whut.sept.zuul.service.Print;

public class EatCommand extends Command {
    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            Print.print("Eat what?");
            return false;
        }

        String thing = getSecondWord();
        int num = game.getCurrentRoom().hasOneThing(thing);

        if(num != -1){
            game.player1.setCarryWeight(game.player1.getCarryWeight() + 5.0);
            Print.print("You eat" + " " + game.getCurrentRoom().things.get(num).name);
            Print.print("You can carry more things!");
            game.getCurrentRoom().things.remove(num);
        }
        else{
            Print.print("There is nothing can eat!");
        }
        return false;
    }
}
