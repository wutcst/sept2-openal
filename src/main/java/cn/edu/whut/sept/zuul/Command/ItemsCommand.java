package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;

public class ItemsCommand extends Command {
    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            game.getCurrentRoom().showThings(game);
            game.player1.showThings(game);
        }

        return false;
    }
}
