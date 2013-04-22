import java.sql.ResultSet;

import org.mule.api.MuleEventContext;
import org.mule.api.MuleMessage;
import org.mule.api.lifecycle.Callable;
import org.mule.api.transformer.TransformerException;
import org.mule.transformer.AbstractMessageAwareTransformer;
import org.mule.transformer.AbstractMessageTransformer;
import org.mule.util.CaseInsensitiveHashMap;

import com.atlassian.jira.rpc.soap.beans.RemoteIssue;

import java.util.Arrays;
import java.util.HashMap;

import java.util.List;

public class ReleasesIterations extends AbstractMessageTransformer {

	@Override
	public Object transformMessage(MuleMessage message, String outputEncoding)
			throws TransformerException {
		RemoteIssue[] response = (RemoteIssue[]) message.getPayload();
		RemoteIssue issue = response[0];
		return issue;
	}

//	@Override
//	public Object onCall(MuleEventContext eventContext) throws Exception {
//		
//		
//		MuleMessage message = eventContext.getMessage();
//		List<CaseInsensitiveHashMap> items = (List<CaseInsensitiveHashMap>) message.getPayload();
//		
//		Release[] out = null;
//		
//		
//		
//		return out;
//	}
	
	

}
