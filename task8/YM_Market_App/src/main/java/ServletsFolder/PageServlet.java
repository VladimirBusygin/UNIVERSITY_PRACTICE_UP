package ServletsFolder;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class PageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext context = request.getSession().getServletContext();
        RequestDispatcher dispatcher = context.getRequestDispatcher("/page.html");
        dispatcher.forward(request, response);
    }
}
