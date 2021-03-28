package bsu.practice.Task5_new;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class GetServlet extends HttpServlet {
    private static final String NAME = "name";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Name is " + request.getParameter(NAME) + "</h1>");
        out.println("</body></html>");
    }



}
