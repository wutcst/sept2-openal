package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.Game;

public class LookCommand extends Command {

    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            game.getCurrentRoom().showThings(game);
        }

        return false;
    }


}
