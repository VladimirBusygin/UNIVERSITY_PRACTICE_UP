package ServletsFolder;
import CollectionFolder.AddCollection;
import org.json.JSONObject;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class AddsServlet extends HttpServlet {
    private AddCollection collection;
    private static final String ID = "id";
    private static final String ADD_NAME = "addName"; // this field only for example to create test collection

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init();
        collection = new AddCollection();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.getOutputStream().println(AddCollection.popAdd(request.getParameter(ID)));
    }

    //This method is only needed to add a post to the collection
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(ADD_NAME, request.getParameter(ADD_NAME));
        AddCollection.pushAdd(jsonObject.toString());
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        AddCollection.delete(request.getParameter(ID));
    }
}
