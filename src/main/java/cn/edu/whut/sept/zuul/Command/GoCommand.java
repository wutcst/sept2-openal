package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;
import cn.edu.whut.sept.zuul.service.Print;
import cn.edu.whut.sept.zuul.entity.Room;

public class GoCommand extends Command
{
    public boolean execute(Game game)
    {
        if(!hasSecondWord()) {
            Print.print("Go where?");
            return false;
        }

        String direction = getSecondWord();
        Room nextRoom = game.getCurrentRoom().getExit(direction);

        if (nextRoom == null) {
            Print.print("There is no door!");
        }
        else {
            Room emRoom = game.getCurrentRoom();
            game.setCurrentRoom(nextRoom);
            game.previousRoom.add(emRoom);
            game.step++;
            Print.s += "Now for step" + " " + game.step;
            //Print.print("Now for step" + " " + game.step);
            Print.print(game.getCurrentRoom().getLongDescription());

            if(game.getCurrentRoom().getRoomNum() >= 11){
                game.getCurrentRoom().randomTransfer(game);
            }

        }

        return false;
    }
}
