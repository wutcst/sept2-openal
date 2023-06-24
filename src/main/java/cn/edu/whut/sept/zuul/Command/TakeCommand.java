package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

public class TakeCommand extends Command {

    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            Print.print("Take what?");
            return false;
        }

        String thing = getSecondWord();
        int num = game.getCurrentRoom().hasOneThing(thing);

        if(thing.equals("all")){
            game.player1.things.addAll(game.getCurrentRoom().things);
            if(game.player1.isOverweight()){
                for (int i = 0; i < game.getCurrentRoom().things.size(); i++) {
                    game.player1.things.remove(game.player1.things.size()-1);
                }
                Print.print("Overweight!You can't carry these!");

            }
            else{
                game.getCurrentRoom().things.clear();
                Print.print("You take everything in the room!");
            }
        }
        else if(num != -1){
            game.player1.things.add(game.getCurrentRoom().things.get(num));
            if(game.player1.isOverweight()){
                game.player1.things.remove(game.player1.things.size()-1);
                Print.print("Overweight!You can't carry these!");
            }
            else{
                Print.print("You take" + " " + game.getCurrentRoom().things.get(num).name);
                game.getCurrentRoom().things.remove(num);
            }
        }
        else{
            Print.print("There is no such thing in the room!");
        }
        return false;
    }

}
