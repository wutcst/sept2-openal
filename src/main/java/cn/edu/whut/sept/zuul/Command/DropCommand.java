package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

import java.util.regex.Pattern;

public class DropCommand extends Command {
    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            Print.print("Drop what?");
            return false;
        }

        String thing = getSecondWord();
        int num = game.player1.hasOneThing(thing);

        if(thing.equals("all")){
            game.getCurrentRoom().things.addAll(game.player1.things);
            game.player1.things.clear();
            Print.print("You drop everything in the room!");
        }
        else if(num != -1){
            game.getCurrentRoom().things.add(game.player1.things.get(num));
            Print.print("You drop" + " " + game.player1.things.get(num).name);
            game.player1.things.remove(num);
        }
        else{
            Print.print("You don't have this thing!");
        }
        return false;
    }

}
