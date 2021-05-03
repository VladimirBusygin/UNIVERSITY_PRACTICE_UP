package ServletsFolder;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class CheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.getWriter().write("{“sucesss” : true}");
    }
}
