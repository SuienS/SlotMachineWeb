package controllers;
import play.mvc.*;
import views.html.*;
import views.html.game.*;


public class SlotMachineController extends Controller {

    public Result stats() {
        return ok(stats.render());
    }

    public Result start() {
        return ok(start.render());
    }

}
