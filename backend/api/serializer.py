from api.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['birthday'] = str(user.birthday) if user.birthday else None
        token['full_name'] = user.profile.full_name
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified']= user.profile.verified

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    birthday = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'birthday', 'password', 'password2']
        
    def validate(self, attributes):
        print("Received data:", attributes)  # Debug print
        if attributes['password'] != attributes['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields does not match."}
            )
        
        if User.objects.filter(email=attributes['email'].lower()).exists():
            raise serializers.ValidationError(
                {"email": ["User with this email already exists."]}
            )
        return attributes
        
    def create(self, validated_data):
        validated_data['email'] = validated_data['email'].lower()
        user = User.objects.create(
            username=validated_data['username'], 
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            birthday=validated_data.get('birthday')
        )
        user.set_password(validated_data['password'])
        user.save()

        return user