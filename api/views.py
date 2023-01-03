from rest_framework import viewsets, filters
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .serializers import BlogSerializer, CommentSerializer
from .models import Blog, Comment
from .serializers import UserCreateSerializer, UserSerializer


# Create your views here.
class BlogView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    serializer_class = BlogSerializer
    queryset = Blog.objects.all()


class CommentView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    filter_backends = [filters.OrderingFilter]


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)

        # This will be used to return our data without exposing the password
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
