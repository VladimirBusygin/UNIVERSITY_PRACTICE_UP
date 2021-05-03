package ServletsFolder;

import CollectionFolder.AddCollection;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class AddsServletSearch extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        AddCollection.search().forEach(object -> {
            try {
                response.getOutputStream().println(object.toString());
            } catch (IOException exception) {}
        });
    }
}
