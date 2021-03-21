package bsu.practice.Task5_new;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class Test1Servlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/status");
        requestDispatcher.forward(request, response);
    }
}
