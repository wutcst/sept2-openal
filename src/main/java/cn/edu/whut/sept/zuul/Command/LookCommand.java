package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;

public class LookCommand extends Command {

    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            game.getCurrentRoom().showThings(game);
        }

        return false;
    }


}
