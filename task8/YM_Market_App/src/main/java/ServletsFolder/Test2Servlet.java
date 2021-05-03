package ServletsFolder;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class Test2Servlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/page");
        requestDispatcher.forward(request, response);
    }
}
